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

export const labelOrderBoxStyle = {
  ...baseLabelBoxStyle,
  display: ["none", "none", "flex"],
  width: ["50px", "50px", "68px"],
};

export const labelNameBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["150px", "150px", "216px"],
};

export const labelDescBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["180px", "180px", "304px"],
};

export const labelDataBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["91.5px", "91.5px", "153.75px"],
};

export const companyListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "column",
  backgroundColor: colorChips.black_300,
};

export const companyItemBoxStyle = {
  cursor: "pointer",
  flexDirection: "row",
  height: "64px",
  borderBottom: `1px solid ${colorChips.gray_300}`,
  "&:last-child": {
    borderBottom: "none",
  },
};

export const itemNameBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: ["8px", "8px", "12px"],
  pl: ["16px", "16px", "24px"],
  pr: ["6px", "6px", "24px"],
  width: ["150px", "150px", "216px"],
};

export const companyDescTypoStyle = {
  overflow: "hidden", //넘치는 내용 숨기기
  display: "-webkit-box", //말줄임표
  WebkitLineClamp: 2, //최대 2줄까지만 표시
  WebkitBoxOrient: "vertical" as const, //세로 방향 줄바꿈 적용
  whiteSpace: "normal",
  wordBreak: "break-word" as const, //단어 단위로 줄바꿈
};
