export const LayoutStyle = () => {
  return {
    mainBox: {
      padding: { xs: "1rem 1rem", sm: "2rem 3rem" },

      //   background: "red",
    },
    imageFlexBox: {
      // border: "2px solid red",
      display: "flex",
      justifyContent: "center",
      marginBottom: {
        xs: "2rem",
        // md: "5rem",
      },
    },
    logoImageBox: {
      width: { xs: "70px", sm: "100px", md: "150px" },
      height: { xs: "100px", sm: "100px", md: "150px" },
      marginTop: { sm: "1.5rem", md: "1.5rem", lg: "2rem" },
    },
    titleComponentStyle: {
      backgroundColor: "#65C971",
      borderRadius: "5px",
      // textAlign: "center",
      color: "#fff",
      padding: {
        xs: "0.7rem",
        md: "1rem",
      },
      //   marginBottom: {
      //     xs: "3rem",
      //     sm: "3rem",
      //   },
    },
  };
};
