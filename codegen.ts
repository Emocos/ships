import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://vortex.korabli.su/api/graphql/glossary/",
  documents: 'src/**/*.graphql',
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        useTypeImports: true,
        skipTypename: false,
      },
    },
  },
};

export default config;
