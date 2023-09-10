import { enumOrderBy, enumArrows, enumRows } from "../const/enums";
export const usersReducer = (state, action) => {
  let _state = { ...state };

  for (let item in _state) {
    if (_state[action.Name].Order !== _state[item].Order)
      _state[item].Order = enumOrderBy.NONE;
    _state[item].Arrow = enumArrows[enumOrderBy.NONE];
  }
  if (action.Name === enumRows.NONE && action.type === enumRows.NONE) {
    return _state;
  }
  switch (_state[action.Name].Order) {
    case enumOrderBy.NONE:
      state[action.Name].Order = enumOrderBy.ASC;
      state[action.Name].Arrow = enumArrows[enumOrderBy.ASC];
      return _state;
    case enumOrderBy.ASC:
      state[action.Name].Order = enumOrderBy.DESC;
      state[action.Name].Arrow = enumArrows[enumOrderBy.DESC];
      return _state;
    case enumOrderBy.DESC:
      state[action.Name].Order = enumOrderBy.NONE;
      state[action.Name].Arrow = enumArrows[enumOrderBy.NONE];
      return _state;
    default:
      return state;
  }
};
