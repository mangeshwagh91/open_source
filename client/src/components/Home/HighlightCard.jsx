const HighlightCard = ({ icon: Icon, title, value, description, delay = 0 }) => {
  return (
    <div 
      className="glass-card p-6 hover-lift group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-lg font-semibold text-foreground mb-2">{title}</div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default HighlightCard;
