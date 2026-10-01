import { useMemo } from 'react';

interface Props {
  password?: string;
}

export const PasswordStrengthBar = ({ password = '' }: Props) => {
  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    if (/[0-9]/.test(password)) s += 1;
    if (/[\W_]/.test(password)) s += 1;
    return s;
  }, [password]);

  const getColor = () => {
    if (score === 0) return 'bg-gray-200';
    if (score <= 2) return 'bg-red-500';
    if (score === 3) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (score === 0) return '';
    if (score <= 2) return 'Yếu';
    if (score === 3) return 'Khá';
    return 'Mạnh';
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              score >= i ? getColor() : 'bg-gray-100'
            }`}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={`text-[11px] mt-1 text-right font-bold tracking-wide uppercase ${
          score <= 2 ? 'text-red-500' : score === 3 ? 'text-amber-500' : 'text-green-500'
        }`}>
          Độ mạnh: {getLabel()}
        </p>
      )}
    </div>
  );
};
