module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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

    // Define associations
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    };

    return Post;
};
