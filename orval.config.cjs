module.exports = {
  v1: {
    input: 'https://api-test.game-snack.co.kr/v3/api-docs', //TODO Swagger json 문서 링크
    output: {
      target: './src/lib/service/api/client.ts',
      mode: 'tags-split',
      schemas: './src/lib/service/api/model',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/service/custom-axios.ts',
          name: 'customAxios',
        },
        query: {
          useQuery: true,
          usePrefetch: true,
          // signal:true,
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
  z1Zod: {
    input: 'https://api-test.game-snack.co.kr/v3/api-docs', //TODO Swagger json 문서 링크
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/lib/service/validations',
      fileExtension: '.zod.ts',
      prettier: true,
    },
  },
};
