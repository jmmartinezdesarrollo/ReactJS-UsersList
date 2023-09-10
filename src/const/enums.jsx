export const enumRows = {
  NONE: "none",
  NAME: "name",
  LAST_NAME: "lastName",
  COUNTRY: "country",
};

export const enumOrderBy = {
  NONE: "none",
  ASC: "asc",
  DESC: "desc",
};
export const enumArrows = {
  [enumOrderBy.NONE]: " ↕︎ ",
  [enumOrderBy.ASC]: " ↑ ",
  [enumOrderBy.DESC]: " ↓ ",
};

export const ROWS_MAP = {
  [enumRows.NONE]: {
    Order: enumOrderBy.NONE,
    Arrow: enumArrows[enumOrderBy.NONE],
  },
  [enumRows.COUNTRY]: {
    Order: enumOrderBy.NONE,
    Arrow: enumArrows[enumOrderBy.NONE],
  },
  [enumRows.NAME]: {
    Order: enumOrderBy.NONE,
    Arrow: enumArrows[enumOrderBy.NONE],
  },
  [enumRows.LAST_NAME]: {
    Order: enumOrderBy.NONE,
    Arrow: enumArrows[enumOrderBy.NONE],
  },
};
