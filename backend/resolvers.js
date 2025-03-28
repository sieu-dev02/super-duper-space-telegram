const Motorcycle = require('./models/Motorcycle');

module.exports = {
  Query: {
    getMotorcycles: async () => await Motorcycle.find({}),
    getMotorcycle: async (_, { id }) => await Motorcycle.findById(id),
  },
  Mutation: {
    createMotorcycle: async (_, { input }) => {
      const motorcycle = new Motorcycle(input);
      return await motorcycle.save();
    },
    updateMotorcycle: async (_, { id, input }) => {
      return await Motorcycle.findByIdAndUpdate(id, input, { new: true });
    },
    deleteMotorcycle: async (_, { id }) => {
      return await Motorcycle.findByIdAndDelete(id);
    }
  }
};