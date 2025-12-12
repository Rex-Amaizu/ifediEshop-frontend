import React, { Fragment } from "react";
import AdminGuard from "@/utils/AdminGuard";

const page = () => {
  return (
    <Fragment>
      <AdminGuard>
        <div>Videos</div>
      </AdminGuard>
    </Fragment>
  );
};

export default page;
