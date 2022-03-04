/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import routes from "../utils/routes";

function DotsOfPages({ formRef }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  useEffect(() => {
    setCurrentPageNumber(
      routes.findIndex(route => route === location.pathname)
    );
  }, [location]);

  const onPreviousArrow = () => {
    navigate(routes[currentPageNumber - 1]);
  };

  const onNextArrow = () => {
    // TODO და თუ ერთი skill მაინც არის არჩეული
    if (!formRef) {
      navigate(routes[currentPageNumber + 1]);
    }
  };

  const dotsClassname = pageNum => {
    if (currentPageNumber < pageNum) {
      return "dot deactiveDot";
    }
    if (currentPageNumber == pageNum) {
      return "dot semiDeactiveDot";
    }

    return "dot";
  };

  return (
    <Container>
      {/* TODO marto wina gverdebs unda echirebodes */}
      <a onClick={onPreviousArrow}>
        <img src="/images/Previous.svg" alt="left arrow" />
      </a>

      <Link to="/personal-information" className={dotsClassname(1)} />
      <Link to="/technlogies" className={dotsClassname(2)} />
      <Link to="/covid" className={dotsClassname(3)} />
      <Link to="/about-events" className={dotsClassname(4)} />
      <Link to="/submitter" className={dotsClassname(5)} />

      <button form={formRef?.current?.id} onClick={onNextArrow}>
        <img src="/images/Next.svg" alt="right arrow" />
      </button>
    </Container>
  );
}

export default DotsOfPages;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  a,
  button {
    width: 19px;
    height: 19px;
    margin: 0 15px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dot {
    border-radius: 50%;
    background-color: var(--redberryRed);
  }
  .semiDeactiveDot {
    pointer-events: none;
  }
  .deactiveDot {
    opacity: 0.1;
    pointer-events: none;
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
