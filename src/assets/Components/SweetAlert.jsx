export const showMessage = (
  msg,
  type = "success"
) => {
  if (type === "error") {
    window.Swal.fire({
      icon: "error",
      title: msg,
      confirmButtonColor: "#9b7cff",
    });
  } else {
    window.Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      title: msg,
    });
  }
};
