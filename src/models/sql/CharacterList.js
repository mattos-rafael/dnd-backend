const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sql.config");

const CharacterList = sequelize.define(
    "CharacterList",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        character_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: { // creamos clave foránea user_id apunta a users.id
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE", // CASCADE DELETE → si borras usuario → se borran sus favoritos
            onUpdate: "CASCADE", // CASCADE UPDATE → si cambia id (raro), se actualiza
        }
    },
    {
        tableName: "character_list", // Nombre real de la tabla en SQL
        timestamps: true,
        underscored: true, // Convierte nombres automáticos a snake_case: createdAt → created_at | updatedAt → updated_at
        // Esto evita duplicados -> Un usuario NO puede guardar la misma película dos veces
        indexes: [
            {
                unique: true,
                fields: ["user_id", "character_id"],
            },
        ],
    }
);

module.exports = CharacterList;
