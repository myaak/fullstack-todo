import { LoaderInnerDiv, LoaderWrapper } from "./Loader.styled.ts";

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderInnerDiv />
      <LoaderInnerDiv />
      <LoaderInnerDiv />
    </LoaderWrapper>
  );
};

export default Loader;
