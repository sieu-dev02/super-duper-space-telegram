const Motorcycle = require('./models/Motorcycle');

module.exports = {
  Query: {  
    getMotorcycles: async () => await Motorcycle.find({}),
    getMotorcycle: async (_, { id }) => await Motorcycle.findById(id)
  },
  Mutation: {
    addMotorcycle: async (_, args) => {
      const newMotor = new Motorcycle(args);
      return await newMotor.save();
    },
    updateMotorcycle: async (_, { id, ...updateData }) => {
      return await Motorcycle.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteMotorcycle: async (_, { id }) => {
      return await Motorcycle.findByIdAndDelete(id);
    }
  }
};