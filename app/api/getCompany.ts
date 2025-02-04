// 없으면 오류나서 임시로 해둔거
const url = new URL("https://api.example.com/companies");

interface GetCompany {
  img: string; // 이미지
  name: string; // 이름
  content: string; // 내용?
  category: string; // 카테고리
  salesRevenue: number; // 매출액
  employeeCnt: number; // 사원 수
  currentPage: number; // 현재 페이지
}
// 기본값 orderBy = "salesHigh", currentPage = 1;

async function getAllCompany(orderBy = "salesHigh"): Promise<GetCompany[]> {
  try {
    const response = await fetch(`${url}?orderBy=${orderBy}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: GetCompany[] = await response.json();
    console.log("getAllCompany data : ", data);
    return data;
  } catch (err) {
    console.log("getAllCompany err : ", err);
    throw err;
  }
}

async function getBookmarkCompany(
  currentPage: number,
  orderBy = "salesHigh"
): Promise<GetCompany[]> {
  try {
    const response = await fetch(
      `${url}?orderBy=${orderBy}&currentPage=${currentPage}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: GetCompany[] = await response.json();
    console.log("getBookmarkCompany data : ", data);
    return data;
  } catch (err) {
    console.log("getBookmarkCompany err : ", err);
    throw err;
  }
}

export const CompanyList = {
  getAllCompany,
  getBookmarkCompany,
};
