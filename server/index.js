const {ApolloServer}= require("apollo-server");
const {typeDefs}= require('./schemas/typeDefs');
const {resolvers}= require('./schemas/resolvers')
const server= new ApolloServer({typeDefs, resolvers , context: ({req})=>{
  return {req}
}});

server.listen().then(({url})=>{
  console.log(`your api is running  ${url} !!! `)
})