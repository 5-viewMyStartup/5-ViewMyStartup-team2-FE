"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { DropDown } from "./dropDown";
import { companyComparisonStore } from "./companyhock";
// import { PageBtnCreate } from "./pagination";

// 주스탄드 이용하기 이건 다 만들고 나서 찾아봐서 해야지
// 회사 이름이랑 사진등 정보 데이터를 가져와서 맵돌리는 곳에 넣으면 될거 같은데? 아닌가?
// 일단은 모든놈들을 div로 만듬 (img 빼고)
// 즐겨찾기 페이지로??

export function CompanyComparison(): React.ReactElement {
  const { companyApiData, setCompanyApiData } = companyComparisonStore();

  useEffect(() => {
    setCompanyApiData();
  }, []);

  return (
    <div>
      {/* 내가 선택한 기업 */}
      <div>
        <div>
          <div>내가 선택한 기업</div>
          <Link href={"비교하기 선택 페이지"}>
            <div>다른 기업 비교하기</div>
          </Link>
        </div>

        <div>
          {/* 이 api는 임시로 일단 박아둔거 */}
          {companyApiData.map((item, index) => {
            // 회사 사진이 없을 때
            if (item.img === "basic") {
              item.img = "/img/img_default.png";
            }
            return (
              <div className="bookmarkCompany" key={index}>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <p className="company-name">{item.name}</p>
                <p className="company-">{item.category}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 비교결과 확인하기 */}
      <div>
        <div>
          <div>
            <div>비교 결과 확인하기</div>
            <DropDown></DropDown>
          </div>

          <div>
            <div id="companyContentBox">
              <div>
                <p>기업명</p>
                <p>기업 소개</p>
                <p>카테고리</p>
                <p>매출액</p>
                <p>재직자</p>
              </div>

              {companyApiData.map((item, index) => {
                // 회사 사진이 없을 때
                if (item.img === "basic") {
                  item.img = "/img/img_default.png";
                }
                return (
                  <div className="companyContent" key={index}>
                    <div>
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                      <p className="articleSellProductName">{item.name}</p>
                    </div>
                    <p className="articleSellProductPrice">{item.content}</p>
                    <p className="articleSellProductPrice">{item.category}</p>
                    <p className="articleSellProductPrice">
                      {item.salesRevenue}
                    </p>
                    <p className="articleSellProductPrice">
                      {item.employeeCnt}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* 기업 순위 확인하기 */}
      <div>
        <div>
          <div>비교 결과 확인하기</div>
          <DropDown></DropDown>
        </div>
        <div id="companyContentBox">
          <div>
            <p>기업명</p>
            <p>기업 소개</p>
            <p>카테고리</p>
            <p>매출액</p>
            <p>재직자</p>
          </div>

          {companyApiData.map((item, index) => {
            // 회사 사진이 없을 때
            if (item.img === "basic") {
              item.img = "/img/img_default.png";
            }
            return (
              <div className="companyContent" key={index}>
                <div>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <p className="articleSellProductName">{item.name}</p>
                </div>
                <p className="articleSellProductPrice">{item.content}</p>
                <p className="articleSellProductPrice">{item.category}</p>
                <p className="articleSellProductPrice">{item.salesRevenue}</p>
                <p className="articleSellProductPrice">{item.employeeCnt}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 페이지네이션 조순님이 만들어주시면 넣어야지 */}
      <div className="articlePage"></div>
    </div>
  );
}
