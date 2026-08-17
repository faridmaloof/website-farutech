import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../types';

interface PageBuilderProps {
  blocks: ContentBlock[];
}

const getAnimation = (animation?: string) => {
  switch (animation) {
    case 'fade-up':
      return { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
    case 'slide-left':
      return { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } };
    case 'slide-right':
      return { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } };
    default:
      return { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } };
  }
};

export const PageBuilder: React.FC<PageBuilderProps> = ({ blocks }) => {
  return (
    <main id="content" className="flex-grow">
      {blocks.map((block) => {
        const animations = getAnimation(block.animation);
        
        return (
          <section
            key={block.id}
            id={block.id}
            role="region"
            aria-labelledby={`${block.id}-title`}
            className={`relative py-20 overflow-hidden ${block.bgClass || 'bg-white'}`}
          >
            <div className="container mx-auto px-4 relative z-10">
              {block.title && (
                <h2 id={`${block.id}-title`} className="sr-only">
                  {block.title}
                </h2>
              )}

              <motion.div
                {...animations}
                transition={{ duration: 0.6 }}
                className={`max-w-7xl mx-auto ${
                  block.position === 'centered' ? 'text-center' : ''
                }`}
              >
                {block.type === 'hero' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                        {block.title}
                      </h1>
                      <p className="text-xl text-gray-600">{block.subtitle}</p>
                      <p className="text-lg text-gray-500">{block.content}</p>
                      {block.cta && (
                        <a
                          href={block.cta.href}
                          className={`inline-block px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 ${
                            block.cta.variant === 'primary'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {block.cta.text}
                        </a>
                      )}
                    </div>
                    {block.image && (
                      <div className="relative">
                        <img
                          src={block.image.src}
                          alt={block.image.alt}
                          className="rounded-2xl shadow-2xl w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(block.type === 'features' || block.type === 'problems' || block.type === 'useCases' || block.type === 'approach') && (
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${block.position === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-gray-900">{block.title}</h3>
                      <p className="text-lg text-gray-600">{block.content}</p>
                      {block.items && (
                        <ul className="space-y-4">
                          {block.items.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <span className="text-green-500 text-xl">✓</span>
                              <div>
                                <strong className="text-gray-900">{item.title}</strong>
                                <p className="text-gray-600">{item.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="relative h-64 md:h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
                       <span className="text-gray-400">Visual {block.type}</span>
                    </div>
                  </div>
                )}

                {block.type === 'metrics' && (
                  <div className="text-center space-y-12">
                    <h3 className="text-3xl font-bold text-gray-900">{block.title}</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {block.items?.map((item, idx) => (
                        <div key={idx} className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                          <div className="text-5xl font-bold text-blue-600 mb-2">{item.value}</div>
                          <div className="text-xl font-semibold text-gray-900">{item.title}</div>
                          <div className="text-gray-500 mt-2">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {block.type === 'cta' && (
                  <div className="text-center space-y-6 py-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">{block.title}</h3>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">{block.content}</p>
                    {block.cta && (
                      <a
                        href={block.cta.href}
                        className="inline-block px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                      >
                        {block.cta.text}
                      </a>
                    )}
                  </div>
                )}
                
                {block.type === 'timeline' && (
                   <div className="space-y-8">
                      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">{block.title}</h3>
                      <div className="grid md:grid-cols-4 gap-6">
                        {block.items?.map((item, idx) => (
                          <div key={idx} className="text-center p-6 bg-white rounded-lg shadow-md">
                            <div className="text-4xl font-bold text-pink-600 mb-2">{idx + 1}</div>
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                )}
              </motion.div>
            </div>
          </section>
        );
      })}
    </main>
  );
};
