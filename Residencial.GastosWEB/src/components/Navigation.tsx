import React from "react";

interface NavigationProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: "transacoes", label: "Lista de Transações" },
        { id: "pessoas", label: "Lista de Pessoas" },
        { id: "categorias", label: "Lista de Categorias" },
    ];

    return (
        <nav className="bg-white border-bottom">
            <div className="container">
                <div className="d-flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`btn btn-link px-4 py-3 text-decoration-none position-relative ${
                                activeTab === tab.id
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                        >
                            {tab.label}

                            {activeTab === tab.id && (
                                <span
                                    className="position-absolute bottom-0 start-0 w-100"
                                    style={{ height: "2px", backgroundColor: "#0d6efd" }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};
