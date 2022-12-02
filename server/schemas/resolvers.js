const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    //user resolver
    users: (parent, args ,context, info) => {
      //  console.log(info);
      if(UserList){
        return {users: UserList};
      }
      else{
        return {
          message: "there is an error!!!"
        }
      }
      
    },
    user: (parent, args ) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    //movie resolver
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },
  User: {
    favoriteMovies: (parent) => {
      // console.log(parent)
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
  //mutation : put , post , delete

  Mutation: {
    createUser: (parents, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUserName: (parents, args) => {
      const { id, newName } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id == id) {
          user.name = newName;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parents, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  UserResult: {
    __resolveType(obj){
      if(obj.users){
        return "usersSuccessfullResult"
      }
      if(obj.message){
        return "usersErrorResults"
      }

     return null;
    }
  }
};

module.exports = { resolvers };
