'use client';

import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, ShieldCheck } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisibilityType, VisibilitySelector } from './visibility-selector';
import { Badge } from './ui/badge';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  isAdmin = false,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const sidebar = useSidebar();

  function handleClick() {
    router.push('/');
  }

  return (
    <div className="sticky top-0 z-10">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        {isMobile && (
          <SidebarToggle
            onClick={() => sidebar.setOpen(!sidebar.open)}
            className="md:hidden"
          />
        )}

        {!isReadonly && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleClick}
              >
                <PlusIcon />
                <span className="md:sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        )}

        {!isReadonly && (
          <ModelSelector
            selectedModelId={selectedModelId}
            className="order-1 md:order-2"
          />
        )}

        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            className="order-1 md:order-3"
          />
        )}

        {/* Add an admin indicator if user is admin */}
        {isAdmin && (
          <Badge variant="secondary" className="ml-auto gap-1 bg-amber-100 text-amber-900 hover:bg-amber-200">
            <ShieldCheck className="h-3 w-3" />
            Admin View
          </Badge>
        )}
      </header>
    </div>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
