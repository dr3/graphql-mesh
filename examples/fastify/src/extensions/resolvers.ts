import type { MeshContext, Resolvers } from '../../.mesh';

const resolvers: Resolvers = {
  Query: {
    v1_pet_by_petId_extended: async (root, args, context: MeshContext, info): Promise<any> => {
      return context.Swapi.Query.v1_pet_by_petId({
        root,
        args,
        context,
        info,
      });
    },
  },
};

export default resolvers;
