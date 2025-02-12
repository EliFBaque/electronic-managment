import React from "react";

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
    return (
        <div className="w-full">
            <p className="text-sm font-semibold text-white">{label}</p>
            {isEditing ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    maxLength={200}
                    className={`bg-[#2a3447] border border-[#3a4459] w-full rounded text-sm mt-1 px-2 resize-none ${height} ${paddingY} ${scrollable ? "overflow-y-auto max-h-20" : ""}`}
                />
            ) : (
                <div
                    className={`bg-[#2a3447] border border-[#3a4459] w-full rounded text-sm flex mt-1 px-2  ${height} ${paddingY} ${itemcenter ? "" : "items-center"} ${center ? "justify-center" : ""} ${scrollable ? "overflow-y-auto max-h-20" : ""}`}
                >
                    {value}
                </div>
            )}
        </div>
    );
};

export default Field;