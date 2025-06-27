interface LoginTabsProps {
  isLogin: boolean;
  onSwitchMode: (mode: boolean) => void;
}

export function LoginTabs({ isLogin, onSwitchMode }: LoginTabsProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
      <button
        onClick={() => onSwitchMode(true)}
        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
          isLogin
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-lg'
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        INICIAR SESIÓN
      </button>
      <button
        onClick={() => onSwitchMode(false)}
        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
          !isLogin
            ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-lg'
            : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
        }`}
      >
        REGISTRARSE
      </button>
    </div>
  );
} 