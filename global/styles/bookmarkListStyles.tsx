import { colorChips } from "./colorChips";

export const listLayout = {
  pt: "40px",
  pb: "140px",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

export const scrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
};

// 실제 스크롤되는 컨텐츠
export const listWrapperStyle = {
  width: "100%",
  pl: { xs: "16px", sm: "0" },
  pr: { xs: "16px", sm: "0" },
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

export const listLabelWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "row",
  height: "39px",
  margin: "16px 0",
  backgroundColor: colorChips.black_100,
};

export const baseLabelBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const bookmarkBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["58px", "58px", "76.75px"],
};

export const descBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["223px", "223px", "384.9px"],
};

export const categoryBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["103px", "103px", "230.65px"],
};

export const applyNumBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["80px", "80px", "141.85px"],
};

export const applyBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["80px", "80px", "141.85px"],
};

export const itemNameBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: ["8px", "8px", "12px"],
  pl: ["16px", "16px", "24px"],
  pr: ["6px", "6px", "24px"],
  width: ["200px", "200px", "300.75px"],
};

export const companyDescTypoStyle = {
  overflow: "hidden", //넘치는 내용 숨기기
  display: "-webkit-box", //말줄임표
  WebkitLineClamp: 2, //최대 2줄까지만 표시
  WebkitBoxOrient: "vertical" as const, //세로 방향 줄바꿈 적용
  whiteSpace: "normal",
  wordBreak: "break-word" as const, //단어 단위로 줄바꿈
};
