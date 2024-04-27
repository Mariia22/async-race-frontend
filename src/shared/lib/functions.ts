export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const range1 = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export function checkIsPageLast(totalNumber: number, limit: number, currentPage: number): boolean {
  return currentPage === Math.ceil(totalNumber / limit);
}
