import { useTheme } from '../../context/ThemeContext';

export default function SkeletonCard() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`rounded-2xl overflow-hidden
      ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-beige-dark/30'}`}>
            <div className={`aspect-square skeleton ${isDark ? 'bg-dark-border' : 'bg-beige'}`} />
            <div className="p-5 space-y-3">
                <div className={`h-5 w-3/4 rounded skeleton ${isDark ? 'bg-dark-border' : 'bg-beige'}`} />
                <div className={`h-3 w-full rounded skeleton ${isDark ? 'bg-dark-border' : 'bg-beige'}`} />
                <div className={`h-3 w-2/3 rounded skeleton ${isDark ? 'bg-dark-border' : 'bg-beige'}`} />
            </div>
        </div>
    );
}
