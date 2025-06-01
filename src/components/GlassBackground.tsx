
const GlassBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20" />
      
      {/* Floating glass elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full glass opacity-30 animate-float" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full glass-red opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-3/4 w-32 h-32 rounded-full glass opacity-40 animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};

export default GlassBackground;
