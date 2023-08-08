import type { Resolvers, MeshContext } from '../../.mesh';

const resolvers: Resolvers = {
  Query: {
    petByPetIdExtended: async (root, args, context: MeshContext, info): Promise<any> => {
      const { petId } = args;

      const data = await context.Swapi.Query.petByPetId({
        root,
        args: {
          petId,
        },
        context,
        info,
      });

      return data;
    },
  },
};

export default resolvers;
