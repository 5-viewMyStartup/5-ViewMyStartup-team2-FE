import { colorChips } from "@/global/styles/colorChips"; // 색상 관련 상수 임포트
import { Typo } from "@/global/styles/Typo"; // 텍스트 스타일을 위한 컴포넌트 임포트
import { CompanyDTO } from "@/global/types/data-contracts"; // ApplicationDTO 타입 임포트
import { Box, Stack } from "@mui/material"; // MUI의 Box와 Stack 컴포넌트 임포트
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
import Image from "next/image";
import {
  companyItemBoxStyle,
  labelOrderBoxStyle,
  itemNameBoxStyle,
  labelDescBoxStyle,
  companyDescTypoStyle,
  labelDataBoxStyle,
} from "@/global/styles/companyListStyles"; // 다양한 스타일 객체 임포트
