import BannerProfile from "../../profile/components/BannerProfile";
import { motion } from "motion/react";
import "./admin.css";
import DashboardAdmin from "../../profile/components/DashboardAdmin";

const AdminLayout = () => {
  return (
    <motion.section
      className="admin-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      >
      <div style={{width: "100%", height: "300px"}}>
        <DashboardAdmin />
      </div>
    </motion.section>
  );
};

export default AdminLayout;
