import React, { useState } from "react";
import Button from "../Button/Button";
import { CustomButtonProps } from "../Button/Button.types";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
    StyledPopover,
    PopoverTrigger,
    StyledArrow,
    Container,
    Content,
    Footer,
    Message,
    Title,
    StyledContent,
} from "./Popover.styles";

interface ButtonPopoverContentProps {
    title: string;
    message?: string;
    content?: React.ReactNode | null;
    onOk: () => void;
    onCancel?: () => void;
    okBtnProps?: {
        text?: string;
    } & CustomButtonProps;
    cancelBtnProps?: {
        text?: string;
    } & CustomButtonProps;
}

export const PopoverContent = ({
    title,
    message,
    content,
    onOk,
    onCancel,
    okBtnProps = {},
    cancelBtnProps = {},
}: ButtonPopoverContentProps) => {
    const { text: okText = "Yes", ...restOkBtnProps } = okBtnProps;
    const { text: cancelText, ...restCancelBtnProps } = cancelBtnProps;

    return (
        <Container>
            <Content>
                <Title>{title}</Title>
                <Message>{message || content}</Message>
            </Content>
            <Footer>
                <Button onClick={onOk} size="small" type="primary" {...restOkBtnProps}>
                    {okText}
                </Button>
                {cancelText ? (
                    <Button onClick={onCancel} size="small" {...restCancelBtnProps}>
                        {cancelText}
                    </Button>
                ) : null}
            </Footer>
        </Container>
    );
};

interface ButtonConfirmationPopover extends ButtonPopoverContentProps {
    children?: React.ReactNode;
}

function ConfirmationPopover({
    title = "",
    message = "",
    content = null,
    onOk,
    onCancel = () => ({}),
    okBtnProps,
    cancelBtnProps,
    children,
}: ButtonConfirmationPopover) {
    const [open, setOpen] = useState(false);

    const onOKClick = () => {
        setOpen(false);
        onOk();
    };

    const onCancelClick = () => {
        setOpen(false);
        onCancel();
    };

    return (
        <StyledPopover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger asChild>
                <span aria-label="Update dimensions">{children}</span>
            </PopoverTrigger>
            <PopoverPrimitive.Portal>
                <StyledContent className="apsara-popover-content" side="bottom" align="end">
                    <PopoverContent
                        title={title}
                        message={message}
                        content={content}
                        onOk={onOKClick}
                        onCancel={onCancelClick}
                        okBtnProps={okBtnProps}
                        cancelBtnProps={cancelBtnProps}
                    />
                    <StyledArrow />
                </StyledContent>
            </PopoverPrimitive.Portal>
        </StyledPopover>
    );
}

export default ConfirmationPopover;
