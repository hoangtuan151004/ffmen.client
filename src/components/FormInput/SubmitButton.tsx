import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from "../../lib/utils"

type SubmitButtonProps = {
    title: string
    buttonType?: 'submit' | 'button' | 'reset' | undefined,
    isLoading?: boolean,
    loadingTitle?: string
    className?: string
}

export default function SubmitButton({
    title,
    buttonType = 'submit',
    isLoading = false,
    loadingTitle = 'Loading...',
    className = "col-span-full",
}: SubmitButtonProps) {

    return (
        <div className={cn("w-full", className)}>
            {isLoading
                ? (
                    <Button disabled className='w-full'>
                        <Loader2 className="animate-spin h-5 w-5 mr-3" />
                        {loadingTitle}
                    </Button>
                )
                : (
                    <Button
                        type={buttonType} className='w-full'>
                        {title}
                    </Button>
                )
            }
        </div>
    )
}
