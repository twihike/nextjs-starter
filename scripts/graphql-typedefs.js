const fs = require('fs');
const path = require('path');

const schema = fs
  .readFileSync(path.join(__dirname, '../../nestjs-starter/schema.graphql'))
  .toString()
  .replace(/`/g, '');

const schemaTs = `const s = \`${schema}\`;

export default s;
`;

fs.writeFileSync(
  path.join(__dirname, '../src/graphql/generated/typedefs.ts'),
  schemaTs,
);
