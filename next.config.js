module.exports = {
  basePath: process.env.GITHUB_REPOSITORY
    ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1]
    : '/',
}