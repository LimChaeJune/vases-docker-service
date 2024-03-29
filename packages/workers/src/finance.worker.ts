// crtfc_key: 6724fcc811ed2c5c50e82d8ef415bad28345c4c4
const getCorpCode = () => {
  // https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${crtfc_key}
  return [];
};

const getCorpInfo = (corp_code: string) => {
  // https://opendart.fss.or.kr/api/company.json?crtfc_key=${crtfc_key}&corp_code=${corp_code}
  return [];
};

export default {
  getCorpCode,
  getCorpInfo,
};
