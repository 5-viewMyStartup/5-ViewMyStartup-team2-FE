export const formatRevenue = (revenue: string): string => {
  const num = parseInt(revenue, 10);

  // 1억 이상인 경우
  if (num >= 100000000) {
    const billion = Math.floor(num / 100000000);
    return `${billion}억 원`;
  }

  // 1천만 이상 1억 미만인 경우
  if (num >= 10000000) {
    const million = Math.floor(num / 10000000);
    return `${million}천만 원`;
  }

  // 1천만 미만인 경우는 그냥 숫자 + '원'으로 표시
  return num.toLocaleString() + "원";
};
