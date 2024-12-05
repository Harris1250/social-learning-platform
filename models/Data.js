module.exports = (sequelize, DataTypes) => {
    const Data = sequelize.define('Data', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Data;
};
