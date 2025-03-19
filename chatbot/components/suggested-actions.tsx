'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'I\'m feeling anxious',
      label: 'and need support',
      action: 'I\'m feeling anxious and need support with managing these feelings.',
    },
    {
      title: 'Help me understand',
      label: 'stress management techniques',
      action: 'Can you suggest some helpful stress management techniques?',
    },
    {
      title: 'I\'d like to learn about',
      label: 'improving sleep habits',
      action: 'What are some healthy sleep habits I can develop?',
    },
    {
      title: 'Share some tips for',
      label: 'daily mental wellness',
      action: 'What are some daily practices for maintaining mental wellness?',
    },
    {
      title: 'How can I practice',
      label: 'self-care today?',
      action: 'Can you suggest some self-care activities for today?',
    },
    {
      title: 'I need help with',
      label: 'managing difficult emotions',
      action: 'Can you help me understand how to manage difficult emotions?',
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
