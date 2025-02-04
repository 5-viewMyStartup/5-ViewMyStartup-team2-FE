// import { companyComparisonStore } from "./companyhock";

// export function PageBtnCreate(): React.ReactElement | undefined | void {
//   // 일부 코드 경로가 값을 반환하지 않습니다 왜지
//   const totalPage: number =
//     totalCount % 10 !== 0 ? Math.ceil(totalCount / 10) : totalCount / 10;
//   const startPage: number = Math.max(1, currentPage - 2);
//   const endPage: number = currentPage + 2;
//   const buttons = [];
//   // 이건 또 머시여
//   // currentTarget이게 target보다 안전하다? 뭔소리지
//   const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
//     SetCurrentPage(Number(event.currentTarget.value));
//   };
//   const { companyApiData, setCompanyApiData } = companyComparisonStore();
//   if (endPage <= totalPage) {
//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(
//         <button
//           value={i}
//           onClick={handleChange}
//           className={i === currentPage ? "buttonActive" : "buttonExtra"}
//         >
//           {i}
//         </button>
//       );
//     }
//     return <>{buttons}</>;
//   } else if (endPage > totalPage) {
//     for (let i = startPage; i <= totalPage; i++) {
//       buttons.push(
//         <button
//           value={i}
//           onClick={handleChange}
//           className={i === currentPage ? "active" : ""}
//         >
//           {i}
//         </button>
//       );
//     }
//     return <>{buttons}</>;
//     // else을 안썼네
//   } else {
//     return console.log("실패");
//   }
// }
