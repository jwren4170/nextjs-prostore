import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="flex-center p-5 text-sm tracking-widest">
        &copy; {currentYear} {APP_NAME}. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
