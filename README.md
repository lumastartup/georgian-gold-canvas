# Remix of Remix of N*D

მინდა ეს ფერები გამოიყენო Modify the wedding invitation app to have a "3D Oil Painting & Luxury Artistic" aesthetic, heavily tailored to Georgian wedding traditions and styling.

Aesthetic & Visuals (3D Painting Style):

- The background should look like a rich, textured oil painting canvas in deep emerald green, with multi-layered depths.

- Use metallic, 3D gold brushstroke effects (using CSS gradients, shadows, and Framer Motion) for borders, accents, and transitions. It should feel like liquid gold on a dark green canvas.

- Incorporate minimalist, high-end, stylized Georgian ornamental motifs (e.g., subtle vine or infinity loops) rendered in a gold painting style.

- Typography: Main headings must strictly use the 'font-custom-wedding' class (for the custom handwritten font), styled to look like it was written with an elegant paintbrush.

Structure & Georgian Context:

1. The Opening (3D Artistic Envelope):

- Starts with a textured, 3D-painted dark green envelope with a heavy gold wax seal.

- Upon clicking, the envelope beautifully unfolds like a canvas, revealing the main card.

- Text fades in: "გეპატიჟებით ჩვენს დაუვიწყარ დღეზე" -> "სალი & ნიკო" -> "26.08.2026".

2. Invitation Text (Warm & Georgian):

- Add a beautiful, welcoming text: "სიყვარულით, ტრადიციითა და ახალი დასაწყისით სავსე დღე... გვიხარია, რომ ჩვენი ცხოვრების ამ უმნიშვნელოვანეს მომენტს ჩვენს საყვარელ ადამიანებთან ერთად ავღნიშნავთ. ველოდებით თქვენთან შეხვედრას!"

- Background music toggle with a custom-designed gold vinyl/brush icon.

3. RSVP Built for Georgian Weddings:

- Form fields: Name/Surname, Attendance (მოვდივარ / სამწუხაროდ ვერ ვახერხებ), Number of Guests (+1, Plus Family), and a crucial dropdown/checkbox for "Dietary Preferences / Fasting Menu" (სამარხვო მენიუ - highly relevant for Georgian guests).

4. Interactive Georgian Seating Chart (მაგიდის განლაგება):

- Render the seating layout elegantly. Instead of just numbers, let's have a premium search bar.

- When a guest types their name, their specific table (მაგიდა) lights up with a soft gold glow, showing who else is at that table (simulating a grand Georgian supra arrangement).

5. Location & Timeline Section:

- Include an elegant timeline of the day (e.g., ჯვრისწერა / ხელმოწერა / საქორწინო წვეულება) using a vertical painted gold line with nodes.

- Add an interactive map component or a beautiful button linked to Google Maps for the venue.

6. Dress Code:

- "Dress Code: Black Tie / Elegant & Sophisticated".

- Show painted color circles representing the allowed palette (Emerald green, gold, champagne, beige, classic black/white).

Technical:

- Use Framer Motion for smooth, organic physics-based animations (mimicking turning a page or painting a stroke).

- Ensure high performance and full mobile responsiveness.

use this font

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://georgian-gold-canvas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0744ed7f-51db-44a0-b675-3a06db740a03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
