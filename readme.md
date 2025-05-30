# [prestonbourne.dev](https://prestonbourne.dev/) ⚡️

my online homebase :)

you're welcome to use any code snippets you find, or even use the entire website as a template

## Quick Info

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://github.com/hashicorp/next-mdx-remote)
- **Storage** [Supabase](https://supabase.com/)

## Speed ⚡

![Website Performance Metrics, Image shows ideal FCP, LCP, CLS, Time to first byte, etc metrics](https://github.com/prestonbourne/www-2024/blob/main/public/speed-insights.png?raw=true)

## Development

1. install package:, `pnpm i`
2. build mdx content, `pnpm run prebuild`
3. run the development server `pnpm run dev`

To install supbase types (_optional_):
`pnpx supabase gen types typescript --project-id {PROJECT_ID} --schema public > src/lib/supabase/types.gen.ts`
[Read More](https://supabase.com/docs/guides/api/rest/generating-types)