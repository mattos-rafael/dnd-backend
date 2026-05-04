const User = require("./User");
const CharacterList = require("./CharacterList");

// Relación: Usuario 1 -> N Favoritos
User.hasMany(CharacterList, {
    foreignKey: "user_id",
    as: "characters",
    onDelete: "CASCADE", // Si borras un usuario → se borran automáticamente sus favoritos
});

// Relación inversa: Favorito -> Usuario
CharacterList.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
});

module.exports = {
    User,
    CharacterList,
};