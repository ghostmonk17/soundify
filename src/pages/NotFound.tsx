import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Home, Music2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Music2 className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! This track seems to be missing from our library.
      </p>
      <Link to="/">
        <Button variant="gradient" size="lg">
          <Home className="w-5 h-5" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
