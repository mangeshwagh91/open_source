const HighlightCard = ({ icon: Icon, title, value, description, delay = 0 }) => {
  return (
    <div 
      className="glass-card-elevated p-8 hover-lift group animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Enhanced icon container */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-16 h-16 rounded-2xl gradient-bg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      </div>
      
      <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">{value}</div>
      <div className="text-xl font-semibold text-foreground mb-3">{title}</div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default HighlightCard;
