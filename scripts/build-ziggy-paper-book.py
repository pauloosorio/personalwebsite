from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path("/Users/pauloosorio/Documents/CV/portfolio/site")
SOURCE = ROOT / "public/assets/about-paper-organic.png"
RIGHT_TEXTURE = ROOT / "public/assets/about-paper-texture-clean.jpg"
OUTPUT = ROOT / "public/assets/ziggy-memory-book/ziggy-paper-book-cutout.png"


def cleaned_alpha(image: Image.Image) -> Image.Image:
    # The About asset already has a carefully cut organic silhouette. Preserve
    # that mask exactly: luminance-based cleanup mistakes deep paper creases for
    # background and creates transparent holes through the centre fold.
    return image.getchannel("A")


def prepare_left_page(image: Image.Image) -> tuple[Image.Image, Image.Image]:
    alpha_bbox = image.getchannel("A").getbbox()
    if alpha_bbox is None:
        raise RuntimeError("The About paper source has no visible alpha silhouette")

    page = image.crop(alpha_bbox)
    # The source cutout retains a very narrow strip of the photographed surface
    # at its top and bottom. Trim only those strips, keeping the torn side edges.
    page = page.crop((0, 58, page.width, page.height - 132))
    page = page.resize((820, 1260), Image.Resampling.LANCZOS)
    page = ImageEnhance.Color(page).enhance(0.82)
    page = ImageEnhance.Brightness(page).enhance(1.02)
    alpha = cleaned_alpha(page)
    page.putalpha(alpha)
    return page, alpha


def prepare_right_page(alpha: Image.Image) -> Image.Image:
    texture = Image.open(RIGHT_TEXTURE).convert("RGB")
    texture = texture.resize((820, 1260), Image.Resampling.LANCZOS)
    texture = ImageEnhance.Color(texture).enhance(0.76)
    texture = ImageEnhance.Brightness(texture).enhance(1.08)
    page = texture.convert("RGBA")
    page.putalpha(alpha.transpose(Image.Transpose.FLIP_LEFT_RIGHT))
    return page


def main() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    left, alpha = prepare_left_page(source)
    right = prepare_right_page(alpha)

    canvas = Image.new("RGBA", (1570, 1280), (0, 0, 0, 0))
    canvas.alpha_composite(left, (0, 10))
    canvas.alpha_composite(right, (750, 10))

    # A shallow binding shadow makes the two independent paper sheets read as
    # one open memory book without introducing a different material language.
    pixels = np.zeros((1280, 1570, 4), dtype=np.uint8)
    center = 785
    for x in range(center - 34, center + 35):
        distance = abs(x - center) / 34
        alpha = round((1 - distance) ** 2 * 46)
        pixels[:, x, :3] = (79, 61, 43)
        pixels[:, x, 3] = alpha
    seam = Image.fromarray(pixels, mode="RGBA").filter(ImageFilter.GaussianBlur(4))
    seam.putalpha(Image.composite(seam.getchannel("A"), Image.new("L", canvas.size, 0), canvas.getchannel("A")))
    canvas = Image.alpha_composite(canvas, seam)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, optimize=True)


if __name__ == "__main__":
    main()
