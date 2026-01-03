import React, { useRef } from "react";

interface FieldProps {
    label?: string;
    value?: string;
    height?: string;
    center?: boolean;
    itemcenter?: boolean;
    paddingY?: string;
    scrollable?: boolean;
    isEditing?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name?: string;
}

const Field: React.FC<FieldProps> = ({
    label = "-",
    value = "-",
    height = "h-8",
    center = false,
    itemcenter = false,
    paddingY = "py-1",
    scrollable = false,
    isEditing = false,
    onChange,
    name,
}) => {
    const dateFieldRef = useRef<HTMLInputElement>(null);
    
    const isDateField = ["fch_entrada", "fch_salida", "fch_presu"].includes(name || "");

    return (
        <div className="w-full">
            <p className="text-sm font-semibold text-white">{label}</p>
            {isEditing ? (
                isDateField ? (
                    <div className="relative">
                        <input
                            type="date"
                            name={name}
                            value={value}
                            onChange={onChange}
                            ref={dateFieldRef}
                            className={`
                                bg-[#363b46] 
                                border 
                                border-[#94979c] 
                                w-full 
                                h-8 
                                rounded 
                                text-sm
                                items-center
                                mt-1 
                                px-2  
                                ${paddingY} 
                            `}
                        />
                    </div>
                ) : (
                    <input
                        name={name}
                        value={value}
                        onChange={onChange}
                        maxLength={200}
                        className={`
                            bg-[#363b46] 
                            border-[#94979c] 
                            border 
                            w-full 
                            rounded 
                            text-sm 
                            mt-1 
                            px-2 
                            resize-none 
                            ${height} 
                            ${paddingY} 
                            ${scrollable ? "overflow-x-auto max-h-20" : ""}`}
                    />
                )
            ) : (
                <div
                    className={`
                        bg-[#2a3447] 
                        border 
                        border-[#3a4459] 
                        w-full 
                        rounded 
                        text-sm 
                        flex 
                        mt-1 
                        px-2 
                        ${height} 
                        ${paddingY} 
                        ${itemcenter ? "" : "items-center"} 
                        ${center ? "justify-center" : ""} 
                        ${scrollable ? "overflow-y-auto max-h-20" : ""}`}
                >
                    <p className="w-full">{value}</p>
                    
                </div>
            )}
        </div>
    );
};

export default Field;