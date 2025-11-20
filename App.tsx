import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from './constants';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, 
  Camera, Mountain, Coffee, User, Globe,
  Sparkles, Heart, Lightbulb, ArrowRight, BookOpen, Calendar, Clock, Briefcase, ArrowLeft, Loader2,
  Shield, Cpu, Lock, Terminal, Server, Activity
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from './types';

const IconMap: Record<string, React.FC<{ className?: string }>> = {
  Github, Linkedin, Twitter, Camera, Mountain, Coffee, Shield, Cpu, Lock, Terminal, Server, Activity
};

type Tab = 'about' | 'blog';

const App: React.FC = () => {
  const { personalInfo, aboutMe, blogPosts, experience } = RESUME_DATA;
  const [activeTab, setActiveTab] = useState<Tab>('about');
  
  // Blog State
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [isPostLoading, setIsPostLoading] = useState(false);

  // Handle fetch for external markdown
  useEffect(() => {
    if (selectedPost) {
      if (selectedPost.markdownUrl) {
        setIsPostLoading(true);
        fetch(selectedPost.markdownUrl)
          .then(res => {
            if (!res.ok) throw new Error("Failed to load post");
            return res.text();
          })
          .then(text => {
            setPostContent(text);
            setIsPostLoading(false);
          })
          .catch(err => {
            console.error(err);
            setPostContent("# Error\n\nCould not load the blog post content. Please check your internet connection or the file URL.");
            setIsPostLoading(false);
          });
      } else {
        setPostContent(selectedPost.content || "");
        setIsPostLoading(false);
      }
    } else {
      setPostContent("");
    }
  }, [selectedPost]);

  const handleBackToBlog = () => {
    setSelectedPost(null);
    setPostContent("");
  };

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 py-8 sm:py-12 px-4">
      {/* Animated Liquid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300 rounded-full blur-[120px] animate-blob mix-blend-multiply"></div>
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-300 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-200 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto">
        
        {/* Single Unified Glass Card */}
        <div className="bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] ring-1 ring-white/50 overflow-hidden flex flex-col">
           
           {/* Top Header Section - Only show if no specific blog post is selected to focus reading mode */}
           {!selectedPost && (
             <div className="flex flex-col items-center p-8 sm:p-12 pb-8 bg-gradient-to-b from-white/40 to-white/10 border-b border-white/40">
                 {/* Avatar */}
                 <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-6 group cursor-default">
                    <div className="w-full h-full rounded-full p-1.5 bg-white shadow-xl relative z-10 ring-1 ring-slate-100">
                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden text-slate-400">
                           {personalInfo.avatarUrl ? (
                               <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
                           ) : (
                               <User className="w-16 h-16" />
                           )}
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform scale-110"></div>
                    <div className="absolute -bottom-2 -right-2 z-20 bg-white/80 backdrop-blur-md border border-white/50 p-2 rounded-full text-indigo-500 shadow-lg">
                        <Sparkles className="w-5 h-5" />
                    </div>
                 </div>

                 <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 tracking-tight text-center">
                     {personalInfo.name}
                 </h1>
                 <p className="text-indigo-600 font-semibold mb-6 tracking-wide uppercase text-xs sm:text-sm">{personalInfo.title}</p>

                 {/* Socials */}
                 <div className="flex flex-wrap justify-center gap-3 mb-6">
                     {personalInfo.socials.map(s => {
                         const Icon = IconMap[s.icon] || Globe;
                         return (
                             <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="p-3 bg-white/60 hover:bg-white border border-white/60 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-md group/icon">
                                 <Icon className="w-5 h-5 text-slate-500 group-hover/icon:text-indigo-600 transition-colors" />
                             </a>
                         )
                     })}
                 </div>

                 <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white/40 py-2 px-4 rounded-full border border-white/50 shadow-sm mb-8">
                     <MapPin className="w-4 h-4 text-slate-400" />
                     {personalInfo.location}
                 </div>

                 {/* Tabs */}
                 <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-2xl w-full max-w-sm border border-white/40 shadow-inner">
                    <button 
                      onClick={() => setActiveTab('about')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'about' ? 'bg-white text-slate-800 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'}`}
                    >
                      <User className="w-4 h-4" />
                      About Me
                    </button>
                    <button 
                      onClick={() => setActiveTab('blog')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'blog' ? 'bg-white text-slate-800 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'}`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Blog
                    </button>
                 </div>
             </div>
           )}

           {/* Main Content Area */}
           <div className={`p-8 sm:p-12 bg-white/30 min-h-[600px] ${selectedPost ? 'pt-8' : ''}`}>
                
                {/* About Tab Content */}
                {activeTab === 'about' && !selectedPost && (
                  <div className="space-y-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
                    {/* Bio */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="p-2 rounded-xl bg-pink-50 border border-pink-100 shadow-sm text-pink-500">
                                <Heart className="w-5 h-5" />
                            </span>
                            My Story
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg font-light">
                            {aboutMe.bio.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </section>

                    {/* Philosophy */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="p-2 rounded-xl bg-amber-50 border border-amber-100 shadow-sm text-amber-500">
                                <Lightbulb className="w-5 h-5" />
                            </span>
                            Philosophy
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/50 border border-white/60 relative overflow-hidden shadow-sm group hover:shadow-md transition-all">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-100/50 blur-3xl rounded-full group-hover:bg-yellow-200/40 transition-colors duration-700"></div>
                            <p className="relative z-10 text-slate-700 italic font-medium text-xl leading-relaxed text-center">"{aboutMe.philosophy}"</p>
                        </div>
                    </section>

                    {/* Work Experience */}
                    <section>
                      <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                          <span className="p-2 rounded-xl bg-blue-50 border border-blue-100 shadow-sm text-blue-500">
                              <Briefcase className="w-5 h-5" />
                          </span>
                          Work Experience
                      </h2>
                      <div className="space-y-8">
                          {experience.map((job, index) => (
                              <div key={index} className="relative pl-8 sm:pl-0">
                                  {/* Desktop Layout */}
                                  <div className="hidden sm:flex gap-6 group">
                                      {/* Timeline column */}
                                      <div className="flex flex-col items-center pt-2">
                                          <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"></div>
                                          <div className="w-0.5 flex-1 bg-slate-200 my-2 group-last:bg-transparent"></div>
                                      </div>
                                      {/* Content card */}
                                      <div className="flex-1 pb-8">
                                          <div className="bg-white/50 border border-white/60 p-6 rounded-3xl hover:bg-white hover:shadow-md transition-all duration-300">
                                              <div className="flex justify-between items-start mb-2">
                                                  <div>
                                                      <h3 className="font-bold text-slate-800 text-lg">{job.role}</h3>
                                                      <div className="text-sm font-medium text-slate-500 flex items-center gap-2 mt-1">
                                                          <span className="text-indigo-600">{job.company}</span>
                                                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                          <span>{job.location}</span>
                                                      </div>
                                                  </div>
                                                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                                                      {job.period}
                                                  </span>
                                              </div>
                                              <ul className="mt-4 space-y-2">
                                                  {job.description.map((desc, i) => (
                                                      <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                                                          <span className="mt-2 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0"></span>
                                                          {desc}
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Mobile Layout */}
                                  <div className="sm:hidden relative border-l-2 border-slate-200 pl-6 pb-8 last:pb-0 last:border-l-0">
                                      <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                                      <div className="bg-white/50 border border-white/60 p-5 rounded-2xl shadow-sm mt-1">
                                          <div className="mb-3">
                                              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">
                                                  {job.period}
                                              </span>
                                              <h3 className="font-bold text-slate-800">{job.role}</h3>
                                              <p className="text-indigo-600 text-sm font-medium">{job.company}</p>
                                          </div>
                                          <ul className="space-y-2">
                                              {job.description.map((desc, i) => (
                                                  <li key={i} className="text-slate-600 text-sm leading-relaxed">
                                                      • {desc}
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                    </section>

                    {/* Interests */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="p-2 rounded-xl bg-cyan-50 border border-cyan-100 shadow-sm text-cyan-500">
                                <Camera className="w-5 h-5" />
                            </span>
                            Interests
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {aboutMe.interests.map((interest, idx) => {
                                const Icon = IconMap[interest.icon] || Globe;
                                return (
                                    <div key={idx} className="p-4 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-4 group cursor-default">
                                        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-500 group-hover:text-indigo-600 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">{interest.name}</h3>
                                            <p className="text-sm text-slate-500 mt-1">{interest.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                  </div>
                )}

                {/* Blog List View */}
                {activeTab === 'blog' && !selectedPost && (
                  <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                          <span className="p-2 rounded-xl bg-purple-50 border border-purple-100 shadow-sm text-purple-500">
                              <BookOpen className="w-5 h-5" />
                          </span>
                          Recent Posts
                      </h2>
                    </div>
                    
                    <div className="grid gap-6">
                      {blogPosts.map((post) => (
                        <article 
                            key={post.id} 
                            onClick={() => setSelectedPost(post)}
                            className="group bg-white/50 hover:bg-white border border-white/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden cursor-pointer"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-[4rem] -mr-8 -mt-8 z-0 group-hover:scale-110 transition-transform duration-500"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                              <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg border border-white/50">
                                <Calendar className="w-3 h-3" /> {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-slate-600 mb-6 leading-relaxed text-lg font-light">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto border-t border-slate-100 pt-4">
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <button className="flex items-center gap-2 text-sm font-bold text-indigo-500 group-hover:text-indigo-700 transition-colors">
                                Read More <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Detail View */}
                {activeTab === 'blog' && selectedPost && (
                   <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                       <button 
                         onClick={handleBackToBlog}
                         className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 group transition-colors font-medium"
                       >
                           <div className="p-2 bg-white/50 rounded-full group-hover:bg-indigo-50 border border-white/50 group-hover:border-indigo-100 transition-all">
                             <ArrowLeft className="w-4 h-4" />
                           </div>
                           Back to all posts
                       </button>

                       <article className="bg-white/50 rounded-3xl p-8 sm:p-10 border border-white/60 relative overflow-hidden">
                           {/* Header */}
                           <div className="mb-8 border-b border-slate-200/60 pb-8">
                               <div className="flex flex-wrap gap-2 mb-4">
                                   {selectedPost.tags.map(tag => (
                                       <span key={tag} className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                                           {tag}
                                       </span>
                                   ))}
                               </div>
                               <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                                   {selectedPost.title}
                               </h1>
                               <div className="flex items-center gap-4 text-sm text-slate-500">
                                   <span className="flex items-center gap-1">
                                       <Calendar className="w-4 h-4" /> {selectedPost.date}
                                   </span>
                                   <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                   <span className="flex items-center gap-1">
                                       <Clock className="w-4 h-4" /> {selectedPost.readTime}
                                   </span>
                               </div>
                           </div>

                           {/* Content */}
                           {isPostLoading ? (
                               <div className="flex justify-center py-20">
                                   <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                               </div>
                           ) : (
                               <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-2xl prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-pre:rounded-xl">
                                   <ReactMarkdown>{postContent}</ReactMarkdown>
                               </div>
                           )}
                       </article>
                   </div>
                )}

                {/* Footer CTA - Hide in blog detail view */}
                {!selectedPost && (
                    <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
                        <div className="flex flex-col items-center">
                        <span className="text-slate-500 mb-2">Interested in working together?</span>
                        <a href="https://www.linkedin.com/in/himanshu-dubey-2ab62062/" target="_blank" rel="noreferrer" className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 transition-all px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                            Get in touch <Linkedin className="w-4 h-4" />
                        </a>
                        </div>
                    </div>
                )}

           </div>
        </div>
      </main>
      
    </div>
  );
};

export default App;