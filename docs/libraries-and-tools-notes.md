# Libraries and tools notes

- Favicon generator: [RealFaviconGenerator](https://realfavicongenerator.net)

- Tailwind CSS

  - [How classes are sorted](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)

- NextAuth

  - Generate `AUTH_SECRET` for `.env*` files and copy it to your clipboard:

    > This is a random value used by the library to encrypt tokens and email verification hashes.

    ```sh
    npx auth secret --copy
    ```
