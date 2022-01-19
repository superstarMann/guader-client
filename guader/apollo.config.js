module.exports = {
    client: {
      includes:['./src/**/*.tsx'], //띄어쓰기 금지
      tag:"gql",
      service:{
          name:'guader-backend',
          url: 'http://localhost:5000/graphql'
      }
    }
  };